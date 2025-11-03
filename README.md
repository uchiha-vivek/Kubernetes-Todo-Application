**Problem Statement** : 

- **Express** backend for building api's
- **Docker** for containerizing the application
- **Kubernetes** for deploying and connecting
- **Supabase** for storing data


<p align="center" style="display: flex; justify-content: center; gap: 150px;">
   <img src="./assets/k8s.png" width="300" alt="k8s">
   <img src="./assets/docker.png" width="300" alt="docker">
</p>





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


## Kubernetes Scripts


`backend-deployment.yaml`

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: todo-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: todo-backend
  template:
    metadata:
      labels:
        app: todo-backend
    spec:
      containers:
        - name: backend
          image: uchihavivek/todo-app:v1
          ports:
            - containerPort: 3000
          env:
            - name: SUPABASE_URL
              valueFrom:
                configMapKeyRef:
                  name: backend-config
                  key: SUPABASE_URL
            - name: SUPABASE_KEY
              valueFrom:
                secretKeyRef:
                  name: backend-secrets
                  key: SUPABASE_KEY
```

`configmap.yaml`

```bash
apiVersion: v1
kind: ConfigMap
metadata: 
  name: backend-config
data:
  SUPABASE_URL: "your url"
  PORT: "3000"
```

`secrets.yaml`

```bash
apiVersion: v1
kind: Secret
metadata:
  name: backend-secrets
type: Opaque
stringData:
  SUPABASE_KEY: "your-key"
  ```

`service.yaml`

```bash
apiVersion: v1
kind: Service
metadata:
  name: todo-backend-service
spec:
  selector:
    app: todo-backend    
  ports:
    - protocol: TCP
      port: 3000         
      targetPort: 3000   
  type: NodePort         
```

`NOTE` : Make sure to add supabase url and supabase key


## Step by Step command to run the project

```bash
git clone https://github.com/uchiha-vivek/Kubernetes-Todo-Application.git
cd Kubernetes-Todo-Application
```

Navigate to backend 

```bash
cd backend
npm install
```


Build the docker image 

```bash
docker build -t <your-docker-username>/todo-app:v1 .
```

Make sure you are logged in ,  if not then run :

```bash
docker login
```

Push to docker hub
```bash
docker push <your-docker-username>/todo-app:v1
```

Run locally

```bash
docker run -p 3000:3000 --env-file .env <your-docker-username>/todo-app:v1
```

NOw test `http://localhost:3000/todos`


Once the yaml file is made , deploy it to kubernetes

Navigate to root level of project

```bash
kubectl apply -f k8s/backend-deployment.yaml
```

```bash
kubectl apply -f k8s/configmap.yaml
```


```bash
kubectl apply -f k8s/secrets.yaml
```


```bash
kubectl apply -f k8s/service.yaml
```


Check the running status

```bash
kubectl get pods
```

```bash
kubectl get svc
```


Run the service


```bash
minikube service todo-backend-service
```

After the service runs, navigate to `http://192.168.49.2:31234/todos`