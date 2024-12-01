## About ELTsim
A test run & use case of [EvoELT](https://github.com/KenennaOkeke/EvoELT).

### Overview
A tool for setting and managing Sims activities with AI-powered analysis. It tracks activity schedules, metrics, and patterns over time, revealing how activities affect happiness, energy, relationships, and more—providing real-time insights and data-driven recommendations.

### Frontend
![ELTsim Frontend](images/frontend.png)

### Structure
- `fe-vuejs_frontend` frontend interface for setting character activities
- `fe-javascript_expressjs_backend` backend supporting the activity interface
- `int-javascript_expressjs_backend` draft implementation for authentication and grouping
- `util-python_message_queueing` integration with EvoELT using message queuing

### How to run
1. Dockerize EvoELT
2. Instructions from READMEs in each project folder
3. Load the UI to set character activities and view estimations
4. Track character metrics over time through the system
5. Use insights to optimize character activities for better outcomes
