pipeline {
    agent{
        any
    }
    stages{
        stage('building, deploying backend app'){
            steps{
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/'){
                    sh 'docker compose up -d --build'
                    sh 'docker compose push'
                }
            }
        }
        stage('building, deploying frontend app'){
            steps{
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/'){
                    sh 'docker compose up -d --build'
                    sh 'docker compose push'
                }
            }
        }
    }
    post{
        always{
            cleanWs()
        }
    }
}