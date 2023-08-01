<!-- ads.index.blade.php -->

<x-app-layout>
</x-app-layout>

<div class="container">
    <h1>Ads Table</h1>
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Ad Title</th>
                <th>Ad Description</th>
                <th>Actions</th> <!-- Add a new column for actions -->
            </tr>
        </thead>
        <tbody>
            @foreach ($ads as $ad)
                <tr>
                    <td>{{ $ad->id }}</td>
                    <td>{{ $ad->title }}</td>
                    <td>{{ $ad->description }}</td>
                    <td>
                        <!-- Edit button with inline style for light green background -->
                        <a href="{{ route('ads.edit', $ad->id) }}" class="btn" style="background-color: #8CC63F; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Edit</a>

                        <!-- Delete button -->
                        <form action="{{ route('ads.destroy', $ad->id) }}" method="POST" style="display: inline-block;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this ad?')">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Add Ad button -->
    <a href="{{ route('ads.create') }}" class="btn btn-primary">Add Ad</a>
</div>
