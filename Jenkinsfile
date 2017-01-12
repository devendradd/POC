#!/usr/bin/env groovy
def docker_registry


node {
   docker_registry = env.DOCKER_REGISTRY
   checkout scm
}

docker.image(docker_registry + "/compozed/ci-base:0.6").inside() {
    env.GRADLE_USER_HOME = "."

    stage "Assemble"
      sh "npm install"

    withCredentials([
        [
        $class          : 'UsernamePasswordMultiBinding',
        credentialsId   : '0d9a5498-bcf0-48ff-a877-91133e87c5d1',
        passwordVariable: 'CF_PASSWORD',
        usernameVariable: 'CF_USERNAME'
        ]]) {

         stage "Deploy"
         sh "cf login -a api.cf.nonprod-mpn.ro11.allstate.com -u ${CF_USERNAME} -p ${CF_PASSWORD} --skip-ssl-validation; cf target -o ARS-ECC -s DEV; cf push"
        }
}
