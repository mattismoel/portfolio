# My Portfolio Website

This is the codebase for my personal website. The website serves as a central hub for all of my experiences, projects, contact information and more.


# Running locally

Running the project locally is as simple as running the "[run.sh](run.sh)" file in the terminal. It spins up a Docker Compose setup for dev. Now the frontend should be usable at [http://localhost:5173](http://localhost:5173), and the backend at [http://localhost:8080](http://localhost:8080).


# Deploying

The deployment is set up with CI/CD using Github Actions. That means, when changes are pushed or merged to the 'main' branch, two images (a frontend and backend image) is published to Github Container Registry (ghcr.io). When the changes have been published, the deployment is done with Docker Stack. 

## Setting up Docker Stack

First create a fitting Docker Context:

`$ docker context create <context_name> --docker "host=ssh://<username>@<domain_or_ip_address>"`

Make sure that the 'context_name' is the same as in your 'deploy.sh' script.

Now you can run the [deploy.sh](deploy.sh) script, which changes to your new context and deploys the stack to remote using [the production compose configuration](compose.prod.yaml).


## Notes on authentication

It is important that you are logged into GitHub Container Registry with Docker for it to be able to pull the frontend and backend images. To do this follow the steps at [docs.github.com](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

