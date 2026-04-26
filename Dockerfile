FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ZainAura/ZainAura /usr/share/nginx/html

RUN mv /usr/share/nginx/html/accueil.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]