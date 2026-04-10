"""
Backend API tests for Iteration 6 - Mauro Ferrante Consulting
Tests: /api/track, /api/admin/login, /api/admin/stats, /api/admin/send-report
"""
import pytest
import requests
import os
import hashlib

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = "4bund4nc142026!"
ADMIN_TOKEN = hashlib.sha256(ADMIN_PASSWORD.encode()).hexdigest()


class TestHealthAndBasicEndpoints:
    """Basic API health checks"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Mauro Ferrante" in data["message"]
        print(f"✓ API root returns: {data['message']}")


class TestTrackingEndpoint:
    """Tests for POST /api/track analytics endpoint"""
    
    def test_track_page_view(self):
        """Test tracking a page view event"""
        response = requests.post(f"{BASE_URL}/api/track", json={
            "event": "page_view",
            "page": "/blog",
            "metadata": {"test": True}
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        print("✓ Track page_view event works")
    
    def test_track_cta_click(self):
        """Test tracking a CTA click event"""
        response = requests.post(f"{BASE_URL}/api/track", json={
            "event": "cta_click",
            "page": "/",
            "metadata": {"button": "hero_book_consultation"}
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        print("✓ Track cta_click event works")
    
    def test_track_form_submit(self):
        """Test tracking a form submit event"""
        response = requests.post(f"{BASE_URL}/api/track", json={
            "event": "form_submit",
            "page": "/",
            "metadata": {"form": "contact"}
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        print("✓ Track form_submit event works")
    
    def test_track_whatsapp_click(self):
        """Test tracking a WhatsApp click event"""
        response = requests.post(f"{BASE_URL}/api/track", json={
            "event": "whatsapp_click",
            "page": "/",
            "metadata": {"region": "europe_asia"}
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        print("✓ Track whatsapp_click event works")
    
    def test_track_missing_event(self):
        """Test tracking with missing event field"""
        response = requests.post(f"{BASE_URL}/api/track", json={
            "page": "/"
        })
        # Should fail validation
        assert response.status_code == 422
        print("✓ Track endpoint validates required event field")


class TestAdminLogin:
    """Tests for POST /api/admin/login"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        assert "token" in data
        assert data["token"] == ADMIN_TOKEN
        print(f"✓ Admin login successful, token received")
    
    def test_admin_login_wrong_password(self):
        """Test admin login with wrong password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "wrongpassword123"
        })
        assert response.status_code == 401
        print("✓ Admin login rejects wrong password with 401")
    
    def test_admin_login_empty_password(self):
        """Test admin login with empty password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": ""
        })
        assert response.status_code == 401
        print("✓ Admin login rejects empty password")


class TestAdminStats:
    """Tests for GET /api/admin/stats"""
    
    def test_admin_stats_with_valid_token(self):
        """Test getting admin stats with valid token"""
        response = requests.get(f"{BASE_URL}/api/admin/stats?token={ADMIN_TOKEN}")
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "overview" in data
        assert "actions" in data
        assert "top_pages" in data
        assert "daily" in data
        assert "events" in data
        assert "recent_contacts" in data
        
        # Verify overview structure
        overview = data["overview"]
        assert "today" in overview
        assert "week" in overview
        assert "month" in overview
        assert "views" in overview["today"]
        assert "conversions" in overview["today"]
        assert "conversion_rate" in overview["week"]
        
        # Verify actions structure
        actions = data["actions"]
        assert "whatsapp_clicks" in actions
        assert "email_clicks" in actions
        assert "cta_clicks" in actions
        
        # Verify daily is a list with 14 days
        assert isinstance(data["daily"], list)
        assert len(data["daily"]) == 14
        
        print(f"✓ Admin stats returns complete data structure")
        print(f"  - Today views: {overview['today']['views']}")
        print(f"  - Week views: {overview['week']['views']}")
        print(f"  - Month views: {overview['month']['views']}")
    
    def test_admin_stats_without_token(self):
        """Test getting admin stats without token"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code == 401
        print("✓ Admin stats rejects request without token")
    
    def test_admin_stats_with_invalid_token(self):
        """Test getting admin stats with invalid token"""
        response = requests.get(f"{BASE_URL}/api/admin/stats?token=invalidtoken123")
        assert response.status_code == 401
        print("✓ Admin stats rejects invalid token")


class TestAdminSendReport:
    """Tests for POST /api/admin/send-report"""
    
    def test_send_report_with_valid_token(self):
        """Test sending weekly report with valid token"""
        response = requests.post(f"{BASE_URL}/api/admin/send-report?token={ADMIN_TOKEN}")
        assert response.status_code == 200
        data = response.json()
        # ok can be True or False depending on SMTP config
        assert "ok" in data
        assert "message" in data
        print(f"✓ Send report endpoint works, ok={data['ok']}, message={data['message']}")
    
    def test_send_report_without_token(self):
        """Test sending report without token"""
        response = requests.post(f"{BASE_URL}/api/admin/send-report")
        assert response.status_code == 401
        print("✓ Send report rejects request without token")
    
    def test_send_report_with_invalid_token(self):
        """Test sending report with invalid token"""
        response = requests.post(f"{BASE_URL}/api/admin/send-report?token=badtoken")
        assert response.status_code == 401
        print("✓ Send report rejects invalid token")


class TestContactEndpoint:
    """Tests for contact form endpoint"""
    
    def test_contact_form_submission(self):
        """Test contact form submission"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User",
            "phone": "+1234567890",
            "email": "test@example.com",
            "service": "pm",
            "message": "This is a test message from iteration 6 testing"
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        print(f"✓ Contact form submission works, fallback={data.get('fallback')}")
    
    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User",
            "phone": "+1234567890",
            "email": "invalid-email",
            "service": "pm",
            "message": "Test message"
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == False
        print("✓ Contact form validates email format")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
