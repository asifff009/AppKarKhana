FROM php:8.3-apache

WORKDIR /var/www/html

# Install MySQLi extension
RUN docker-php-ext-install mysqli

# Disable all Apache MPM modules first
RUN a2dismod mpm_event || true
RUN a2dismod mpm_worker || true
RUN a2dismod mpm_prefork || true

# Enable only the PHP-compatible prefork MPM
RUN a2enmod mpm_prefork

# Enable Apache rewrite module
RUN a2enmod rewrite

# Copy PHP API files
COPY . /var/www/html/

# Create upload directories
RUN mkdir -p /var/www/html/uploads/payment_screenshots \
    && chown -R www-data:www-data /var/www/html/uploads \
    && chmod -R 775 /var/www/html/uploads

# Make sure Apache listens on port 80
RUN sed -i 's/^Listen .*/Listen 80/' /etc/apache2/ports.conf \
    && sed -i 's/<VirtualHost \*:[0-9]*>/<VirtualHost *:80>/' /etc/apache2/sites-available/000-default.conf

EXPOSE 80

CMD ["apache2-foreground"]