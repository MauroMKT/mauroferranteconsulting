"""
Iteration 8 Backend API Tests
Tests for:
- Refactored API endpoints (contact, analytics, newsletter routes)
- New newsletter count endpoint
- Admin login and stats
- Contact form submission
- Track events
"""
import pytest
import requests
import os
import hashlib
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = "4bund4nc142026!"
ADMIN_TOKEN = hashlib.sha256(ADMIN_PASSWORD.encode()).hexdigest()


class TestRootEndpoint:
    """Test root API endpoint"""
    
    def test_api_root(self):
        """Test GET /api/ returns welcome message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "message" in data
        print(f"PASS: API root endpoint working - {data['message']}")


class TestNewsletterCount:
    """Tests for new GET /api/newsletter/count endpoint"""
    
    def test_newsletter_count_returns_count(self):
        """Test GET /api/newsletter/count returns subscriber count"""
        response = requests.get(f"{BASE_URL}/api/newsletter/count")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "count" in data, f"Expected 'count' key in response, got {data}"
        assert isinstance(data["count"], int), f"Count should be integer, got {type(data['count'])}"
        assert data["count"] >= 0, f"Count should be non-negative, got {data['count']}"
        print(f"PASS: Newsletter count endpoint returns count={data['count']}")


class TestNewsletterSubscribe:
    """Tests for POST /api/newsletter/subscribe after refactoring"""
    
    def test_subscribe_valid_email(self):
        """Test subscribing with a valid email"""
        test_email = f"TEST_iter8_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": test_email, "locale": "en"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["ok"] is True, f"Expected ok=True, got {data}"
        print(f"PASS: Newsletter subscription successful for {test_email}")
    
    def test_subscribe_invalid_email(self):
        """Test subscribing with invalid email returns ok=False"""
        response = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": "notanemail", "locale": "en"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] is False, f"Expected ok=False for invalid email, got {data}"
        print(f"PASS: Invalid email rejected correctly")


class TestTrackEndpoint:
    """Tests for POST /api/track after refactoring"""
    
    def test_track_page_view(self):
        """Test tracking a page view event"""
        response = requests.post(
            f"{BASE_URL}/api/track",
            json={"event": "page_view", "page": "/about", "metadata": {"test": True}}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["ok"] is True, f"Expected ok=True, got {data}"
        print(f"PASS: Track page_view event successful")
    
    def test_track_form_submit(self):
        """Test tracking a form submit event"""
        response = requests.post(
            f"{BASE_URL}/api/track",
            json={"event": "form_submit", "page": "/contact", "metadata": {"source": "test"}}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data["ok"] is True, f"Expected ok=True, got {data}"
        print(f"PASS: Track form_submit event successful")
    
    def test_track_whatsapp_click(self):
        """Test tracking a WhatsApp click event"""
        response = requests.post(
            f"{BASE_URL}/api/track",
            json={"event": "whatsapp_click", "page": "/"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] is True
        print(f"PASS: Track whatsapp_click event successful")


class TestAdminLogin:
    """Tests for POST /api/admin/login after refactoring"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["ok"] is True, f"Expected ok=True, got {data}"
        assert "token" in data, f"Expected token in response, got {data}"
        assert data["token"] == ADMIN_TOKEN, "Token should match expected hash"
        print(f"PASS: Admin login successful")
    
    def test_admin_login_wrong_password(self):
        """Test admin login with wrong password returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword123"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print(f"PASS: Admin login rejects wrong password")


class TestAdminStats:
    """Tests for GET /api/admin/stats after refactoring"""
    
    def test_admin_stats_with_valid_token(self):
        """Test getting admin stats with valid token"""
        response = requests.get(
            f"{BASE_URL}/api/admin/stats",
            params={"token": ADMIN_TOKEN}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "overview" in data, f"Expected 'overview' in response, got {data.keys()}"
        assert "actions" in data, f"Expected 'actions' in response"
        assert "top_pages" in data, f"Expected 'top_pages' in response"
        assert "daily" in data, f"Expected 'daily' in response"
        assert "events" in data, f"Expected 'events' in response"
        
        # Verify overview structure
        overview = data["overview"]
        assert "total_events" in overview
        assert "today" in overview
        assert "week" in overview
        assert "month" in overview
        
        print(f"PASS: Admin stats endpoint returns complete data structure")
    
    def test_admin_stats_without_token(self):
        """Test getting admin stats without token returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print(f"PASS: Admin stats endpoint requires authentication")
    
    def test_admin_stats_with_invalid_token(self):
        """Test getting admin stats with invalid token returns 401"""
        response = requests.get(
            f"{BASE_URL}/api/admin/stats",
            params={"token": "invalid_token_12345"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print(f"PASS: Admin stats endpoint rejects invalid token")


class TestContactForm:
    """Tests for POST /api/contact after refactoring"""
    
    def test_contact_form_submission(self):
        """Test submitting a contact form"""
        test_data = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "phone": "+1234567890",
            "email": f"TEST_contact_{uuid.uuid4().hex[:8]}@example.com",
            "service": "pm",
            "message": "This is a test message from iteration 8 testing."
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=test_data
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["ok"] is True, f"Expected ok=True, got {data}"
        print(f"PASS: Contact form submission successful")
    
    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email"""
        test_data = {
            "name": "Test User",
            "phone": "+1234567890",
            "email": "invalid-email",
            "service": "pm",
            "message": "Test message"
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=test_data
        )
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] is False, f"Expected ok=False for invalid email, got {data}"
        print(f"PASS: Contact form rejects invalid email")


class TestAdminNewsletter:
    """Tests for GET /api/admin/newsletter after refactoring"""
    
    def test_get_subscribers_with_valid_token(self):
        """Test getting newsletter subscribers with valid admin token"""
        response = requests.get(
            f"{BASE_URL}/api/admin/newsletter",
            params={"token": ADMIN_TOKEN}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "subscribers" in data, f"Expected 'subscribers' key in response, got {data}"
        assert "total" in data, f"Expected 'total' key in response, got {data}"
        assert isinstance(data["subscribers"], list), "Subscribers should be a list"
        print(f"PASS: Admin newsletter endpoint returns {data['total']} subscribers")
    
    def test_get_subscribers_without_token(self):
        """Test getting newsletter subscribers without token returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/newsletter")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print(f"PASS: Admin newsletter endpoint requires authentication")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
