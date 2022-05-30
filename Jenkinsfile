def label = "kubepods${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
        containerTemplate(name: 'nodejs', image: 'node:13.3.0', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
	containerTemplate(name: 'kubectl', image: 'bearengineer/awscli-kubectl', command: 'cat', ttyEnabled: true)
    
        
],
volumes: [
   hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  
]) {
  node(label) {
    def scmInfo = checkout scm
    def image_tag
      def image_name
      sh 'pwd'
      def gitCommit = scmInfo.GIT_COMMIT
      def gitBranch = scmInfo.GIT_BRANCH
      def commitId
      commitId= scmInfo.GIT_COMMIT[0..7]
      image_tag = "latest"
      image_name = "app_node"
	  
	  stage('NPM Install') {
	    container ('nodejs') {
	         sh 'npm install'   
	    }
       }
	  
	  stage('Build Docker Image') {
	    container ('docker') {
		    sh "docker build  --network=host -t palanidatabricks/nodeserver:latest ."
	    }
       }
	  
	
	stage('Docker Login') {
	    container ('docker') {
		    withCredentials([usernameColonPassword(credentialsId: 'dockerhubcredentials', variable: 'dockerhubcredentials')]) {   
         }		    
	    }
       }
	  
	  stage('Docker Image Push') {
	    container ('docker') {
		    //sh "docker login -u palanidatabricks -p Dell!@#00 docker.io"
		    
                   //sh 'docker login -u palanidatabricks -p "${dockerhubcredentials}" docker.io'
		    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
		    //sh "docker push palanidatabricks/nodeserver:latest "
          }
           }
	
  }
}
