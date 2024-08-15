[Okta_Integ.webm](https://github.com/user-attachments/assets/cb42718f-b54a-4819-bfb1-1642be15ddde)

To set up and run this project, follow these steps:
1. git clone <repository-url>
  Navigate to the Repository Directory
2. cd okta_integ_portal
3. npm install
4. Create a .env File in the root directory of the project.
5. Refer to the provided image for the required environment variable names and values. The rest of the account related vars will need to be fetched from the dashboard. Please follow the instructions below for that:
![image](https://github.com/user-attachments/assets/fb5c0839-712e-4071-86b3-be703ada5735)

Set Up Okta:
1. Sign Up for Okta: Create a free Okta developer account at developer.okta.com.
2. Access the Okta Admin Dashboard: Log in to your Okta account and navigate to the Okta Admin Dashboard.
3. Create an Application in Okta:
4. Go to Applications > Applications.
5. Click Create App Integration.
6. Choose the platform (e.g., Web) and the sign-on method (e.g., OpenID Connect for OAuth 2.0 or SAML 2.0).
7. Fill out the necessary details such as redirect URI and allowed grant types.
8. Save the application.
