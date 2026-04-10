import requests
import sys
from datetime import datetime
import json

class MauroConsultingAPITester:
    def __init__(self, base_url="https://graphics-portal-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_api_root(self):
        """Test the root API endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_message = "Mauro Ferrante Consulting Studio API"
                if data.get("message") == expected_message:
                    self.log_test("API Root Endpoint", True, f"Status: {response.status_code}, Message: {data.get('message')}")
                else:
                    self.log_test("API Root Endpoint", False, f"Unexpected message: {data.get('message')}")
            else:
                self.log_test("API Root Endpoint", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Exception: {str(e)}")

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "phone": "+39 123 456 7890",
            "email": "test@example.com",
            "service": "pm",
            "message": "This is a test message for the contact form."
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                if data.get("ok") and data.get("fallback") and data.get("mailto"):
                    self.log_test("Contact Form Submission", True, 
                                f"Status: {response.status_code}, OK: {data.get('ok')}, Fallback: {data.get('fallback')}")
                else:
                    self.log_test("Contact Form Submission", False, 
                                f"Missing expected fields in response: {data}")
            else:
                self.log_test("Contact Form Submission", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")

    def test_contact_form_validation(self):
        """Test contact form validation with missing fields"""
        invalid_data = {
            "name": "",  # Empty name should fail
            "phone": "",
            "email": "invalid-email",  # Invalid email
            "service": "",
            "message": ""
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # The backend might still accept this and return 200, but with ok: false
            # or it might return a validation error
            if response.status_code in [200, 400, 422]:
                if response.status_code == 200:
                    data = response.json()
                    if not data.get("ok"):
                        self.log_test("Contact Form Validation", True, "Validation correctly rejected invalid data")
                    else:
                        self.log_test("Contact Form Validation", False, "Invalid data was accepted")
                else:
                    self.log_test("Contact Form Validation", True, f"Validation error returned: {response.status_code}")
            else:
                self.log_test("Contact Form Validation", False, f"Unexpected status: {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact Form Validation", False, f"Exception: {str(e)}")

    def test_get_contacts(self):
        """Test getting contacts (if endpoint exists)"""
        try:
            response = requests.get(f"{self.api_url}/contacts", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Contacts Endpoint", True, f"Retrieved {len(data)} contacts")
                else:
                    self.log_test("Get Contacts Endpoint", False, "Response is not a list")
            elif response.status_code == 404:
                self.log_test("Get Contacts Endpoint", True, "Endpoint not found (expected for public API)")
            else:
                self.log_test("Get Contacts Endpoint", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_test("Get Contacts Endpoint", False, f"Exception: {str(e)}")

    def test_cors_headers(self):
        """Test CORS headers"""
        try:
            response = requests.options(f"{self.api_url}/contact", timeout=10)
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            has_cors = any(header in response.headers for header in cors_headers)
            
            if has_cors:
                self.log_test("CORS Headers", True, "CORS headers present")
            else:
                # Try a regular request to check CORS
                response = requests.get(f"{self.api_url}/", timeout=10)
                has_cors = 'Access-Control-Allow-Origin' in response.headers
                self.log_test("CORS Headers", has_cors, 
                            "CORS headers present" if has_cors else "No CORS headers found")
                
        except Exception as e:
            self.log_test("CORS Headers", False, f"Exception: {str(e)}")

    def test_service_mapping(self):
        """Test different service types in contact form"""
        services = ["pm", "digital", "re", "other"]
        
        for service in services:
            test_data = {
                "name": f"Test User {service}",
                "phone": "+39 123 456 7890",
                "email": f"test-{service}@example.com",
                "service": service,
                "message": f"Test message for {service} service."
            }
            
            try:
                response = requests.post(
                    f"{self.api_url}/contact",
                    json=test_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                success = response.status_code == 200
                if success:
                    data = response.json()
                    success = data.get("ok", False)
                
                self.log_test(f"Service Mapping - {service}", success, 
                            f"Status: {response.status_code}")
                
            except Exception as e:
                self.log_test(f"Service Mapping - {service}", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Mauro Ferrante Consulting Studio API Tests")
        print(f"🔗 Testing API at: {self.api_url}")
        print("=" * 60)
        
        # Test API availability
        self.test_api_root()
        
        # Test contact form functionality
        self.test_contact_form_submission()
        self.test_contact_form_validation()
        self.test_service_mapping()
        
        # Test additional endpoints
        self.test_get_contacts()
        
        # Test CORS
        self.test_cors_headers()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return 1

def main():
    tester = MauroConsultingAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())