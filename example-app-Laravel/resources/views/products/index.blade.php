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
        <table border="2">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Description</th>
                <th id="edit">Edit</th>
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
                        <!-- Replace the anchor tag with a button tag -->
                        <form id="edit" method="get" action="{{route('product.edit', ['product' => $product])}}">
                            <input  type="submit" value="Edit"/>
                        </form>
                    </td>
                    <td>
                        <!-- Delete button to delete a product -->
                        <form id="delete" method="post" action="{{route('product.delete', ['product' => $product])}}">
                            <!-- Cross-Site Request Forgery -->
                            @csrf
                            @method('delete')
                            <input type="submit" value="Delete"/>
                        </form>
                    </td>
                </tr>
            @endforeach
        </table>
    </div>
    
</body>
</html>