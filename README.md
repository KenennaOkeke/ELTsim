## About ELTsim
A test run use case for [EvoELT](https://github.com/KenennaOkeke/EvoELT) using a Vue.js frontend, Express.js backend, and some python for backend processing. EvoELT is written in Kotlin, akin to Java.

### Overview
A calculator that estimates your data usage. Statistics are processed for each user: minimum, average (mean), and maximum both for each calculation and overall.

### Frontend View
![ELTsim Frontend](art/frontend.png)

### Process
![ELTsim Sequence Diagram](art/process.png)

### End Product
Info from the previous plays is used to generate further statistics:
![ELTsim DB](art/product.png)
*a mean of means, mean of mins, or mean of maxes so to speak*

### Breakdown
1. The frontend asks the backend for a calculation
2. The backend provides the calculation to the frontend, and sends the statistical request to EvoELT via Message Queuing Service (AWS SQS)
3. The transformation/processing application generates statistics based on previous calculations (tied to the user, Info Squirrel in this case) and sends them back to EvoELT for storage

### How to run
1. Dockerize [EvoELT](https://github.com/KenennaOkeke/EvoELT).
2. Readme in the `python_raw_to_processed` folder
3. Readme in the `javascript_express_user_backend` folder
4. Readme in the `javascript_vue_user_frontend` folder
5. Load the UI and pick your user
6. Calculate your bandwidth and lo and behold the Postgres DB