<!-- edit.blade.php -->

@extends('layouts.app') {{-- Assuming you have a layout file --}}

@section('content')
    <div class="container">
        <h1>Edit Ad</h1>
        <form action="{{ route('ads.update', $ad->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" class="form-control" value="{{ $ad->title }}" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea name="description" id="description" class="form-control" rows="5" required>{{ $ad->description }}</textarea>
            </div>
            <!-- Add other ad fields here if needed -->
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Update Ad</button>
                <a href="{{ route('ads.index') }}" class="btn btn-secondary">Cancel</a>
            </div>
        </form>
    </div>
@endsection
