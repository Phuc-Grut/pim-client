FROM harbor.vfico.com/base/nginx:1.14.2-alpine as production-stage

ENV SKIP_PREFLIGHT_CHECK=true
ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_BASENAME="VFICO"
ENV REACT_APP_PRODUCT_CODE="PIM"
ENV REACT_APP_DEFAULT_AVATAR="http://dev.vfico.local/cdn/vfico.png"
ENV REACT_APP_BASE_URL="http://dev.vfico.local/pim-gw"
ENV REACT_APP_ENV="production"
ENV REACT_APP_CDN_URL_VIEW="http://dev.vfico.local/cdn/file"
ENV REACT_APP_BASE_URL_CDN="http://dev.vfico.local/cdn/view/file"

FROM harbor.vfico.com/base/node:18.17.1 as build-stage
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build:production
FROM production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY site.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]