+----------------------+
                |   Employee (Entity)  |
                +----------------------+
                          |
                          | Submit Time
                          v
                +----------------------+
                |  Time Capture Layer  |
                | (Clock-in/out, PTO)  |
                +----------------------+
                          |
                          | Auto-Tag + Audit Log
                          v
                +----------------------+
                | Supervisor Review    |
                | (Per Entity)         |
                +----------------------+
                          |
          +---------------+---------------+
          |                               |
   Approve/Correct                   Return to Employee
          |                               |
          +---------------+---------------+
                          |
                          v
                +----------------------+
                |  Owner Approval      |
                | (Multi-Entity View)  |
                +----------------------+
                          |
                          | Approve + Lock
                          v
                +----------------------+
                |   Payroll Engine     |
                +----------------------+
                          |
                          | Generate Pay + Reports
                          v
                +----------------------+
                |  Record Retention    |
                | (Audit-Ready)        |
                +----------------------+
