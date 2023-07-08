pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Deploy to server') {
            steps {
                sshagent(['ssh-greenbabyborn-green']) {
                    sh 'rsync -e "ssh -o StrictHostKeyChecking=no" -avz . "green@greenbabyborn.ru:~/greenbabyportfolio"'
                }
            }
        }
        stage('Build frontend') {
            steps {
                sshagent(['ssh-greenbabyborn-green']) {
                    sh '''ssh -o StrictHostKeyChecking=no -tt green@greenbabyborn.ru << EOF
                    cd ~/greenbabyportfolio/frontend
                    npm ci
                    npx nuxi build --dotenv .env.production
                    source .env.production && pm2 start
                    exit
               EOF'''
                }
            }
        }
        stage('Build backend') {
            steps {
                sshagent(['ssh-greenbabyborn-green']) {
                    sh '''ssh -o StrictHostKeyChecking=no -tt green@greenbabyborn.ru << EOF
                    cd ~/greenbabyportfolio/backend
                    npm ci
                    npm run build
                    pm2 start
                    exit
               EOF'''
                }
            }
        }
    }
}
