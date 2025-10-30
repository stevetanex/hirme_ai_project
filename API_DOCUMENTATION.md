Endpoint,Method,Access,Description,Request Body Example
/api/auth/register,POST,Public,Register new Job Seeker or Employer.,"{ name, email, password, role }"
/api/auth/login,POST,Public,Log in and receive JWT token.,"{ email, password }"
/api/jobs,GET,Public,Browse jobs with Filtering and Pagination.,"Query params: ?page=2&limit=10&location=remote&skills=react,node"
/api/jobs,POST,Private,Create a new job. (Requires Employer role),"{ title, description, location, skills, salaryRange, type }"
/api/jobs/:id,PUT,Private,Update job. (Requires Employer and Ownership),{ title: 'New Title' }
/api/jobs/:id,DELETE,Private,Delete job. (Requires Employer and Ownership),None
