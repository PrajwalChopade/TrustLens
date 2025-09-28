pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS_18', type: 'NodeJS'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // git branch: 'main', url: 'https://github.com/PrajwalChopade/TrustLens.git'
                git branch: 'main', url: 'https://github.com/PrajwalChopade/TrustLens.git'

            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                sh 'cd frontend && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'cd backend && mvn clean package'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                # Copy frontend build to server (example)
                rm -rf /var/www/html/*
                cp -r frontend/build/* /var/www/html/

                # Deploy backend jar (example)
                cp backend/target/backend.jar /opt/backend/backend.jar
                # Run backend (you might want to use systemd or nohup)
                nohup java -jar /opt/backend/backend.jar &
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
