def label = "worker-2${UUID.randomUUID().toString()}"

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
		    withCredentials([string(credentialsId: 'dockerhub_user_pass', variable: 'dockerhub_user_pass')]) {
			    sh "docker login -u palanidatabricks -p ${dockerhub_user_pass}"
         }
		    
	    }
       }
       
       stage('Docker Image Push') {
	    container ('docker') {
		    sh "docker login -u palanidatabricks -p Dell!@#00 docker.io"
                   
		    sh "docker push palanidatabricks/nodeserver:latest "
          }
           }
	    
    stage('Preparing Deployment scripts') {
     container('kubectl') {
      echo "Preparation of deployment scripts! IMAGE_NAME=${image_name} and IMAGE_TAG=${image_tag}"
          // Inject image and tag values in deployment scripts
          withEnv(["IMAGE_NAME=${image_name}", "IMAGE_TAG=${image_tag}"]) {
            def files = findFiles(glob: 'infrastructure/**/*.yaml')
            for (def file : files) {
               sh "sed -i 's,\${IMAGE_NAME},${IMAGE_NAME},g;s,\${IMAGE_TAG},${IMAGE_TAG},g' ${file.path}"
            }
          }
        }
    }
	  
	  stage('Deploy') {
           container('kubectl') {
	   withCredentials([kubeconfigFile(credentialsId: 'KUBERNETES_CLUSTER_CONFIG', variable: 'KUBECONFIG')]) {
            def kubectl
             echo 'deploy to deployment!!'
             sh '''
	      if kubectl get deployment | grep app_node
	      then
	         kubectl set image deployment app_node app_node=palanidatabricks/nodeserver:latest
		 kubectl rollout restart deployment app_node
	      else
	         kubectl apply -f ./infrastructure/pre-release/all-in-one-ui.yaml -n default
	      fi
	      '''
            }
             }
        }  
	    
	  
  }
}
