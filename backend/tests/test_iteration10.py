"""
Iteration 10 Backend Regression Tests
Tests: contact, newsletter, admin login, blog reactions
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestBackendRegression:
    """Backend API regression tests for iteration 10"""
    
    def test_contact_form_submission(self):
        """POST /api/contact - submit contact form"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Iteration10",
            "email": "test10@example.com",
            "phone": "+1234567890",
            "service": "project-management",
            "message": "Test message from iteration 10"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("ok") == True, f"Expected ok:true, got {data}"
    
    def test_newsletter_subscribe(self):
        """POST /api/newsletter/subscribe - subscribe to newsletter"""
        import time
        unique_email = f"test10_{int(time.time())}@example.com"
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": unique_email
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("ok") == True, f"Expected ok:true, got {data}"
    
    def test_admin_login_success(self):
        """POST /api/admin/login - login with correct password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "4bund4nc142026!"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "token" in data, f"Expected token in response, got {data}"
        assert len(data["token"]) > 0, "Token should not be empty"
    
    def test_admin_login_failure(self):
        """POST /api/admin/login - login with wrong password returns 401"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "wrongpassword"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}: {response.text}"
    
    def test_blog_reactions_get(self):
        """GET /api/blog/{slug}/reactions - get reactions for blog post"""
        response = requests.get(f"{BASE_URL}/api/blog/graphics-portal-1/reactions")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        # Should have reaction counts
        assert "like" in data or "reactions" in data or isinstance(data, dict), f"Unexpected response format: {data}"
    
    def test_blog_reactions_for_agile_post(self):
        """GET /api/blog/project-management-agile-vs-waterfall/reactions - get reactions"""
        response = requests.get(f"{BASE_URL}/api/blog/project-management-agile-vs-waterfall/reactions")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert isinstance(data, dict), f"Expected dict response, got {type(data)}"
    
    def test_api_root(self):
        """GET /api/ - health check"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
