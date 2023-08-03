<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <div style="background-color: #f0f0f0; padding: 20px;">
        <h1 style="text-align: center;">Welcome to Your Dashboard</h1>
        <div style="display: flex; justify-content: center;">
            <a href="{{ route('ads.index') }}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ads Panel</a>
            <a href="{{ route('ads.olxAds') }}" style="background-color: #28a745; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-left: 10px;">OLX Ads</a>
        </div>
    </div>
</body>
</html>
