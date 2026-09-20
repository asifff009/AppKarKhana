FROM php:8.3-apache

WORKDIR /var/www/html

# Install MySQLi
RUN docker-php-ext-install mysqli

# Remove all enabled MPM modules
RUN rm -f /etc/apache2/mods-enabled/mpm_*.load \
    /etc/apache2/mods-enabled/mpm_*.conf

# Enable only prefork MPM
RUN a2enmod mpm_prefork

# Enable rewrite
RUN a2enmod rewrite

# Copy API files
COPY . /var/www/html/

# Upload directories
RUN mkdir -p /var/www/html/uploads/payment_screenshots \
    && chown -R www-data:www-data /var/www/html/uploads \
    && chmod -R 775 /var/www/html/uploads

# Apache port
RUN sed -i 's/^Listen .*/Listen 80/' /etc/apache2/ports.conf \
    && sed -i 's/<VirtualHost \*:[0-9]*>/<VirtualHost *:80>/' /etc/apache2/sites-available/000-default.conf

# Check Apache configuration during build
RUN apache2ctl -t

EXPOSE 80

CMD ["apache2-foreground"]