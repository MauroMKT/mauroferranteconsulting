"""
Iteration 9 Backend Tests
Tests for:
- Blog reactions API (GET /api/blog/{slug}/reactions, POST /api/blog/{slug}/react)
- Previous endpoints still working (contact, track, newsletter, admin)
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestBlogReactionsAPI:
    """Blog reactions endpoint tests"""
    
    def test_get_reactions_new_slug(self):
        """GET /api/blog/{slug}/reactions returns default reactions for new slug"""
        response = requests.get(f"{BASE_URL}/api/blog/test-new-article-{int(time.time())}/reactions")
        assert response.status_code == 200
        data = response.json()
        assert "slug" in data
        assert "reactions" in data
        # New slugs return default 0 values
        assert data["reactions"].get("like", 0) == 0
        assert data["reactions"].get("love", 0) == 0
        assert data["reactions"].get("insightful", 0) == 0
        assert data["reactions"].get("fire", 0) == 0
        print("PASS: GET /api/blog/{slug}/reactions returns default reactions for new slug")
    
    def test_get_reactions_existing_slug(self):
        """GET /api/blog/project-management-agile-vs-waterfall/reactions returns reaction counts"""
        response = requests.get(f"{BASE_URL}/api/blog/project-management-agile-vs-waterfall/reactions")
        assert response.status_code == 200
        data = response.json()
        assert "slug" in data
        assert data["slug"] == "project-management-agile-vs-waterfall"
        assert "reactions" in data
        # Reactions object exists (may have partial keys if only some reactions exist)
        assert isinstance(data["reactions"], dict)
        print(f"PASS: GET /api/blog/project-management-agile-vs-waterfall/reactions - reactions: {data['reactions']}")
    
    def test_post_reaction_like(self):
        """POST /api/blog/test-article/react with reaction=like creates reaction"""
        test_slug = f"TEST-article-{int(time.time())}"
        
        # First get initial state
        initial = requests.get(f"{BASE_URL}/api/blog/{test_slug}/reactions")
        assert initial.status_code == 200
        initial_like = initial.json()["reactions"].get("like", 0)
        
        # Post a like reaction
        response = requests.post(f"{BASE_URL}/api/blog/{test_slug}/react", json={
            "reaction": "like",
            "previous": None
        })
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] == True
        assert "reactions" in data
        assert data["reactions"].get("like", 0) == initial_like + 1
        print(f"PASS: POST /api/blog/{test_slug}/react with reaction=like - new count: {data['reactions'].get('like', 0)}")
    
    def test_post_reaction_switch(self):
        """POST /api/blog/test-article/react with reaction=fire and previous=like switches reactions"""
        test_slug = f"TEST-switch-{int(time.time())}"
        
        # First add a like
        requests.post(f"{BASE_URL}/api/blog/{test_slug}/react", json={
            "reaction": "like",
            "previous": None
        })
        
        # Get state after like
        after_like = requests.get(f"{BASE_URL}/api/blog/{test_slug}/reactions")
        like_count = after_like.json()["reactions"].get("like", 0)
        fire_count = after_like.json()["reactions"].get("fire", 0)
        
        # Switch from like to fire
        response = requests.post(f"{BASE_URL}/api/blog/{test_slug}/react", json={
            "reaction": "fire",
            "previous": "like"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] == True
        # Like should decrease, fire should increase
        assert data["reactions"].get("fire", 0) == fire_count + 1
        assert data["reactions"].get("like", 0) == max(0, like_count - 1)
        print(f"PASS: POST /api/blog/{test_slug}/react switches from like to fire correctly")
    
    def test_post_reaction_invalid(self):
        """POST /api/blog/test-article/react with invalid reaction returns error"""
        response = requests.post(f"{BASE_URL}/api/blog/test-article/react", json={
            "reaction": "invalid_reaction",
            "previous": None
        })
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] == False
        assert "Invalid reaction" in data.get("message", "")
        print("PASS: POST /api/blog/test-article/react rejects invalid reaction")


class TestPreviousEndpoints:
    """Verify all previous endpoints still work"""
    
    def test_root_endpoint(self):
        """GET /api/ returns welcome message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Mauro Ferrante" in data["message"]
        print("PASS: GET /api/ returns welcome message")
    
    def test_newsletter_count(self):
        """GET /api/newsletter/count returns subscriber count"""
        response = requests.get(f"{BASE_URL}/api/newsletter/count")
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        print(f"PASS: GET /api/newsletter/count returns count: {data['count']}")
    
    def test_newsletter_subscribe(self):
        """POST /api/newsletter/subscribe saves email"""
        test_email = f"TEST_iter9_{int(time.time())}@example.com"
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": test_email
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        print(f"PASS: POST /api/newsletter/subscribe - subscribed {test_email}")
    
    def test_newsletter_subscribe_invalid(self):
        """POST /api/newsletter/subscribe rejects invalid email (returns ok:false)"""
        response = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={
            "email": "invalid-email"
        })
        # API returns 200 with ok:false for invalid email
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == False
        assert "Invalid email" in data.get("message", "")
        print("PASS: POST /api/newsletter/subscribe rejects invalid email with ok:false")
    
    def test_track_page_view(self):
        """POST /api/track tracks page_view events"""
        response = requests.post(f"{BASE_URL}/api/track", json={
            "event": "page_view",
            "page": "/test-iter9",
            "metadata": {"referrer": "test"}
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        print("PASS: POST /api/track tracks page_view events")
    
    def test_admin_login_success(self):
        """POST /api/admin/login returns token with correct password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "4bund4nc142026!"
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        assert "token" in data
        print("PASS: POST /api/admin/login returns token with correct password")
    
    def test_admin_login_failure(self):
        """POST /api/admin/login returns 401 with wrong password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "wrong-password"
        })
        assert response.status_code == 401
        print("PASS: POST /api/admin/login returns 401 with wrong password")
    
    def test_admin_stats_with_token(self):
        """GET /api/admin/stats returns stats with valid token (query param)"""
        # First login
        login = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "4bund4nc142026!"
        })
        token = login.json().get("token")
        
        # Get stats using query param (not header)
        response = requests.get(f"{BASE_URL}/api/admin/stats?token={token}")
        assert response.status_code == 200
        data = response.json()
        assert "overview" in data
        assert "top_pages" in data
        print("PASS: GET /api/admin/stats returns stats with valid token")
    
    def test_admin_stats_without_token(self):
        """GET /api/admin/stats returns 401 without token"""
        response = requests.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code == 401
        print("PASS: GET /api/admin/stats returns 401 without token")
    
    def test_contact_form(self):
        """POST /api/contact submits contact form (requires phone and service)"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Iter9_User",
            "email": f"TEST_iter9_{int(time.time())}@example.com",
            "phone": "+1234567890",
            "service": "pm",
            "message": "Test message from iteration 9 testing"
        })
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == True
        print("PASS: POST /api/contact submits contact form successfully")
    
    def test_contact_form_invalid_email(self):
        """POST /api/contact rejects invalid email (returns ok:false)"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Test User",
            "email": "invalid-email",
            "phone": "+1234567890",
            "service": "pm",
            "message": "Test message"
        })
        # API returns 200 with ok:false for invalid email
        assert response.status_code == 200
        data = response.json()
        assert data.get("ok") == False
        print("PASS: POST /api/contact rejects invalid email with ok:false")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
