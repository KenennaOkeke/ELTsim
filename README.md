## About ELTsim
A test run & use case of [EvoELT](https://github.com/KenennaOkeke/EvoELT) using a Vue.js frontend, Express.js backend, and python script for batch processing. EvoELT is written in Kotlin, akin to Java.

### Overview
A calculator that estimates data usage. Statistics are processed for each user: minimum, average (mean), and maximum both for each separate calculation and all calculations (average of minimums, means, and maximums).

### Frontend
![ELTsim Frontend](art/frontend.png)

### Process
![ELTsim Sequence Diagram](art/process.png)

### End Product
Info from previous plays is used to generate further statistics:

![ELTsim DB](art/product.png)

*found in the `ee_processed_events` database table*

### Summary
1. The frontend asks the backend for a calculation
2. The backend provides the calculation to the frontend, and sends the statistical request to EvoELT via Message Queuing Service (AWS SQS)
3. The transformation/processing application generates statistics based on previous calculations (tied to the selected user) and sends them back to EvoELT for storage

### How to run
1. Dockerize [EvoELT](https://github.com/KenennaOkeke/EvoELT).
2. READMEs:
   1. the `python_raw_to_processed` folder 
   2. the `javascript_express_user_backend` folder
   3. the `javascript_vue_user_frontend` folder
3. Load the UI and pick your user
4. Calculate data usage and lo and behold the Postgres DB
