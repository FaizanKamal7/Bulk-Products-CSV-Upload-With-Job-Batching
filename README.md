<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <h1>APIMIO CSV Products Importer</h1>
    <p>This Laravel application allows you to import product data from an Excel file into a database, validating against unique SKUs and sending email notifications for duplicate SKUs.</p>
    <h2>Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>PHP (7.3 or later)</li>
        <li>Composer</li>
        <li>MySQL or another database system</li>
        <li>SMTP-enabled email account (Gmail recommended)</li>
    </ul>
    <h3>Installation</h3>
    <ol>
        <li>Clone the repository:</li>
    </ol>
    <pre><code>git clone https://github.com/your-username/product-importer.git
cd product-importer</code></pre>
    <ol start="2">
        <li>Install the dependencies:</li>
    </ol>
    <pre><code>composer install</code></pre>
    <ol start="3">
        <li>Copy the <code>.env.example</code> file to <code>.env</code> and configure it with your environment details:</li>
    </ol>
    <pre><code>cp .env.example .env</code></pre>
    <p>Update the following settings:</p>
    <ul>
        <li><code>DB_CONNECTION</code>, <code>DB_HOST</code>, <code>DB_PORT</code>, <code>DB_DATABASE</code>, <code>DB_USERNAME</code>, <code>DB_PASSWORD</code> for your database.</li>
        <li><code>MAIL_MAILER</code>, <code>MAIL_HOST</code>, <code>MAIL_PORT</code>, <code>MAIL_USERNAME</code>, <code>MAIL_PASSWORD</code> for your email configuration.</li>
    </ul>
    <ol start="4">
        <li>Generate the application key:</li>
    </ol>
    <pre><code>php artisan key:generate</code></pre>
    <ol start="5">
        <li>Run migrations to create the necessary database tables:</li>
    </ol>
    <pre><code>php artisan migrate</code></pre>
    <ol start="6">
        <li>Start the development server:</li>
    </ol>
    <pre><code>php artisan serve</code></pre>
    <h2>Usage</h2>
    <ol>
        <li>Access the application by visiting <a href="http://127.0.0.1:8000">http://127.0.0.1:8000</a> in your browser.</li>
        <li>On the web page, you can upload an Excel file containing product data. The expected CSV format is as follows:</li>
    </ol>
    <pre><code>title,description,sku,type,cost_price,status
Product 1,Description 1,SKU001,TypeA,100.00,active
Product 2,Description 2,SKU002,TypeB,200.00,inactive
...</code></pre>
    <p>Ensure that the CSV file has column names corresponding to the ones listed above.</p>
    <ol start="3">
        <li>Before importing, make sure to update the <code>.env</code> file with your custom email and password, and the database name.</li>
        <li>Upon import, the application will validate for unique SKUs. If a duplicate SKU is found, an email notification will be sent to the configured email address (customizable in the <code>ProductImport</code> class).</li>
    </ol>
    <h2>Customization</h2>
    <ul>
        <li>Customize the validation rules, email content, and other import-related logic in the <code>ProductImport</code> class (<code>app/Imports/ProductImport.php</code>).</li>
        <li>Customize the email content and layout in the <code>DuplicateSkuNotification</code> Mailable class (<code>app/Mail/DuplicateSkuNotification.php</code>).</li>
    </ul>
    <h2>Troubleshooting</h2>
    <ul>
        <li>If you encounter issues, ensure that you have correctly configured the <code>.env</code> file with the appropriate database and email settings.</li>
    </ul>
    <h2>Contributing</h2>
    <p>Contributions are welcome! If you find a bug or have an enhancement in mind, feel free to submit a pull request.</p>
    <h2>License</h2>
    <p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>
</body>
</html>
