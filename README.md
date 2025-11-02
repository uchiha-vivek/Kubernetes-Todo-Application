**Problem Statement** : 

- **Express** backend for building api's
- **Docker** for containerizing the application
- **Kubernetes** for deploying and connecting
- **Supabase** for storing data


Your **env** file for backend 

```bash
SUPABASE_URL=
SUPABASE_KEY=
```

IN supabase run the follwing commands to run the sql script

```sql
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Add any dummy values 

```sql
INSERT INTO todos (task, completed) VALUES
('Learn Docker basics', false),
------dummy values------------
```

### Kubernetes Scripts


Check the contexts kubectl knows

```bash
kubectl config get-contexts
```

First check if minikube is running or not

```bash
minikube status
```

Starting minikube

```bash
minikube start --driver=docker
```


Verifying the connection with kubectl

```bash
kubectl cluster-info
```

Checking node health

```bash
kubectl get nodes
```