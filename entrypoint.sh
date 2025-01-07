#!/bin/sh
echo "Starting replace ENV:"
printenv | grep REACT_APP_ | while read -r line ; do
  key=$(echo $line | cut -d "=" -f1)
  value=$(echo $line | cut -d "=" -f2)
  find /usr/share/nginx/html -type f -exec sed -i "s|{$key}|$value|g" {} \;
  echo "Replace $key done: $line"
done
echo "Replace ENV done!"
#run container service
#nginx
echo "Starting Nginx server..."
# Execute the CMD provided in the Dockerfile
exec "$@"