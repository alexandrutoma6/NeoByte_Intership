<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel Create Product</title>
    <link rel="stylesheet"  href="{{ asset('styleForm.css') }}">
</head>
<body>
    <h1>Create a product</h1>
    <div id="error">
        @if($errors->any())
        <ul>
            @foreach($errors->all() as $error)
                <li>{{$error}}</li>
            @endforeach
        </ul>
        @endif
    </div>
    <form method="post" action="{{route('product.store')}}">
        @csrf 
        @method('post')
        <div>
            <label>Name</label>
            <input type="text" name="name" placeholder="name" value="{{old("name")}}"/>
        </div>
        <div>
            <label>Quantity</label>
            <input type="text" name="qty" placeholder="quantity" value="{{old("qty")}}"/>
        </div>
        <div>
            <label>Price</label>
            <input type="text" name="price" placeholder="price" value="{{old("price")}}"/>
        </div>
        <div>
            <label>Description</label>
            <input type="text" name="description" placeholder="description" value="{{old("description")}}"/>
        </div>
        <div>
            <input type="submit" value="Save a new Product">
        </div>
    </form>
</body>
</html>