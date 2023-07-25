<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //redirect to the index page where the products are displayed
    public function index(){
        $products = Product::all();
        return view('products.index', ['products' => $products]);
    }
   //redirect to the crate page 
    public function create(){
        return view('products.create');
    }
    
    public function store(Request $request){
        //validation data entered in the from
        $data = $request->validate([
            'name' => 'required',
            'qty' => 'required|numeric',
            'price' => 'required|decimal:2',
            'description' => 'nullable'
        ]);
        //add the product to the db
        $newProduct = Product::create($data);
        return redirect(route('product.index'));
    }

    public function edit(Product $product){
        return view('products.edit',['product' => $product]);
    }
    public function update(Product $product, Request $request){
        $data = $request->validate([
            'name' => 'required',
            'qty' => 'required|numeric',
            'price' => 'required|decimal:2',
            'description' => 'nullable'
        ]);
        $product -> update($data);
        return redirect(route('product.index'))-> with('success','Product Updated Successfuly');
    }
    public function delete(Product $product){
        $product->delete();
        return redirect(route('product.index'))-> with('success','Product Deleted Successfuly');
    }
}
