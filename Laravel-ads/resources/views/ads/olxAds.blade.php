<x-app-layout>
</x-app-layout>

<div class="container">
    <h1>Ads Table</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Ad Title</th>
                <th>Ad Price</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($ads as $ad)
                <tr>
                    <td>{{ $ad['title'] }}</td>
                    <td>{{ $ad['price'] }}</td>
                    <!-- Add more columns if needed -->
                </tr>
            @empty
                <tr>
                    <td colspan="2">No ads found.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>
