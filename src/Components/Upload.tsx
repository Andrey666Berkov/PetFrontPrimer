import { Button } from "@mui/material";
import { FilesService } from "../api/files";

export type PartETagInfo = {
	partNumber: number;
	eTag: string;
};

export function Upload() {
	const handleFileChange = async (file: File) => {
		const {
			data: { key, uploadId },
		} = await FilesService.startMultipart(file.name, file.type, file.size);
		console.log(key, uploadId);

		const chunkSize = 10 * 1024 * 1024;
		const parts: PartETagInfo[] = [];

		let partNumber = 1;

		for (let start = 0; start < file.size; start += chunkSize) {
			const chank = file.slice(start, start + chunkSize);
			console.log(chank);

			const { data } = await FilesService.getPresignedUrl(
				key,
				uploadId,
				partNumber
			);
			console.log(data);
			const response = await FilesService.uploadPart(data.url, chank);

			console.log(response);

			const etag = response.headers["etag"] as string;
			console.log(etag);

			parts.push({ partNumber, eTag: etag });
			partNumber++;
		}

		const response = await FilesService.compleateMultipart(
			key,
			uploadId,
			parts
		);
		console.log(response);

		alert(`Upload compleated  ${response.data.location}`);
	};

	return (
		<section className="flex flex-col px-10 py-8 gap-6 w-full ">
			<Button component="label" variant="contained" tabIndex={-1}>
				Upload Video
				<input
					type="file"
					className=" hidden"
					accept="video/*"
					multiple={false}
					onChange={(e) => handleFileChange(e.target.files![0])}
				/>
			</Button>
		</section>
	);
}
