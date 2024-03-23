<script setup></script>

<!-- <template>
    <div class="container mx-auto p-4">
		<div class="relative w-full h-screen">
			<div class="absolute left-1/2 top-1/2">
				Test
			</div>
		</div>
	</div>
</template> -->

<!-- <template>
	<div class="grid">
		<div class="grid-cols-2">item 1</div>
		<div class="grid-cols-2">item 2</div>
		<div class="grid-cols-2">item 3</div>
		<div class="grid-cols-2">item 4</div>
		<div class="grid-cols-2">item 5</div>
		<div class="grid-cols-2">item 6</div>
	</div>
</template> -->

<script setup>
const downloadFile = () => {
    const fileUrl = "../assets/cat.ico";
    window.open(fileUrl, "_Blank");
};
</script>

<template>
    <!-- test download -->

    <button @click="downloadFile" class="btn btn-secondary">Download</button>
</template>
