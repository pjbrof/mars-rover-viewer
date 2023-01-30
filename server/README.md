`docker build -t pjbrof/mars-rover:1.0 .`

`docker run -p 3001:3001 -d --env-file ../.env pjbrof/mars-rover:1.0`

`docker push/pull pjbrof/mars-rover:1.0`

`scp file.txt user@server:/dir/`
