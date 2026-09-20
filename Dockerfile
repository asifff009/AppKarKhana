FROM php:8.3-apache

WORKDIR /var/www/html

RUN docker-php-ext-install mysqli

COPY . /var/www/html/

RUN mkdir -p /var/www/html/uploads/payment_screenshots \
    && chown -R www-data:www-data /var/www/html/uploads \
    && chmod -R 775 /var/www/html/uploads

RUN a2enmod rewrite

EXPOSE 80

CMD ["apache2-foreground"]