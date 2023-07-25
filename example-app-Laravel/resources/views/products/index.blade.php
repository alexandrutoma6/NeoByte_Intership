<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UFT-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Laravel App</title>  
        <link rel="stylesheet"  href="{{ asset('styleIndex.css') }}">
</head>
<body>
    <h1 id="title">Product</h1>
    <div>
        @if (session()->has('success'))
        <div id="success">
            {{session('success')}}
        </div>
        @endif
    </div>
    <div>
        <!-- Display all the products -->
        <table border = "2">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Description</th>
                <th>Edit</th>
                <th id="delete">Delete</th>
            </tr>
            @foreach($products as $product)
                <tr>
                    <td>{{$product->id}}</td>
                    <td>{{$product->name}}</td>
                    <td>{{$product->qty}}</td>
                    <td>{{$product->price}}</td>
                    <td>{{$product->description}}</td>
                    <td>
                        <a href="{{route('product.edit', ['product' => $product])}}">Edit</a>
                    </td>
                    <td>
                        <!-- Delete button to detele a product -->
                        <form method="post" action="{{route('product.delete', ['product' => $product])}}">
                            <!-- Cross-Site Request Forgery -->
                            @csrf
                            @method('delete')
                            <input type ="submit" value="Delete"/>
                        </form>
                    </td>
                </tr>
            @endforeach
        </table>
    </div>
</body>
</html>