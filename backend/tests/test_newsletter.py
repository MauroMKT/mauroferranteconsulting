"""
Newsletter API Tests - Iteration 7
Tests for newsletter subscription and admin newsletter endpoints
"""
import pytest
import requests
import os
import hashlib
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = "4bund4nc142026!"
ADMIN_TOKEN = hashlib.sha256(ADMIN_PASSWORD.encode()).hexdigest()


class TestNewsletterSubscription:
    """Tests for POST /api/newsletter/subscribe endpoint"""
    
    def test_subscribe_valid_email(self):
        """Test subscribing with a valid email"""
        test_email = f"TEST_newsletter_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": test_email, "locale": "en"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["ok"] is True, f"Expected ok=True, got {data}"
        assert "message" in data
        print(f"PASS: Newsletter subscription successful for {test_email}")
    
    def test_subscribe_duplicate_email(self):
        """Test subscribing with an already subscribed email returns ok=True with 'Already subscribed'"""
        test_email = f"TEST_duplicate_{uuid.uuid4().hex[:8]}@example.com"
        
        # First subscription
        response1 = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": test_email, "locale": "it"}
        )
        assert response1.status_code == 200
        assert response1.json()["ok"] is True
        
        # Second subscription (duplicate)
        response2 = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": test_email, "locale": "it"}
        )
        assert response2.status_code == 200, f"Expected 200, got {response2.status_code}"
        data = response2.json()
        assert data["ok"] is True, f"Expected ok=True for duplicate, got {data}"
        assert "Already subscribed" in data.get("message", ""), f"Expected 'Already subscribed' message, got {data}"
        print(f"PASS: Duplicate email handled correctly")
    
    def test_subscribe_invalid_email_format(self):
        """Test subscribing with invalid email format returns ok=False"""
        invalid_emails = ["notanemail", "missing@domain", "@nodomain.com", "spaces in@email.com"]
        
        for invalid_email in invalid_emails:
            response = requests.post(
                f"{BASE_URL}/api/newsletter/subscribe",
                json={"email": invalid_email, "locale": "en"}
            )
            assert response.status_code == 200, f"Expected 200, got {response.status_code}"
            data = response.json()
            assert data["ok"] is False, f"Expected ok=False for invalid email '{invalid_email}', got {data}"
            print(f"PASS: Invalid email '{invalid_email}' rejected correctly")
    
    def test_subscribe_with_different_locales(self):
        """Test subscribing with different locale values"""
        locales = ["en", "it", "es", "fr", "de"]
        
        for locale in locales:
            test_email = f"TEST_locale_{locale}_{uuid.uuid4().hex[:8]}@example.com"
            response = requests.post(
                f"{BASE_URL}/api/newsletter/subscribe",
                json={"email": test_email, "locale": locale}
            )
            assert response.status_code == 200
            data = response.json()
            assert data["ok"] is True, f"Expected ok=True for locale {locale}, got {data}"
            print(f"PASS: Subscription with locale '{locale}' successful")
    
    def test_subscribe_email_case_insensitive(self):
        """Test that email subscription is case-insensitive"""
        base_email = f"TEST_case_{uuid.uuid4().hex[:8]}@example.com"
        
        # Subscribe with lowercase
        response1 = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": base_email.lower(), "locale": "en"}
        )
        assert response1.status_code == 200
        assert response1.json()["ok"] is True
        
        # Try to subscribe with uppercase (should be treated as duplicate)
        response2 = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": base_email.upper(), "locale": "en"}
        )
        assert response2.status_code == 200
        data = response2.json()
        assert data["ok"] is True
        assert "Already subscribed" in data.get("message", ""), f"Expected case-insensitive duplicate detection"
        print(f"PASS: Email case-insensitivity working correctly")


class TestAdminNewsletter:
    """Tests for GET /api/admin/newsletter endpoint"""
    
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
        assert isinstance(data["total"], int), "Total should be an integer"
        print(f"PASS: Admin newsletter endpoint returns {data['total']} subscribers")
    
    def test_get_subscribers_without_token(self):
        """Test getting newsletter subscribers without token returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/newsletter")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print(f"PASS: Admin newsletter endpoint requires authentication")
    
    def test_get_subscribers_with_invalid_token(self):
        """Test getting newsletter subscribers with invalid token returns 401"""
        response = requests.get(
            f"{BASE_URL}/api/admin/newsletter",
            params={"token": "invalid_token_12345"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print(f"PASS: Admin newsletter endpoint rejects invalid token")


class TestAdminLogin:
    """Tests for admin login endpoint"""
    
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


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
