import axios from "axios";
import { PartETagInfo } from "../Components/Upload";

export class FilesService {
	static async startMultipart(
		fileName: string,
		contentType: string,
		size: number
	) {
		return await axios.post<{ key: string; uploadId: string }>(
			"http://localhost:5014/files/multipart",
			{
				fileName,
				contentType,
				size,
			}
		);
	}

	static async uploadPart(url: string, chunk: Blob) {
		return await axios.put<{ key: string; uploadId: string }>(url, chunk, {
			headers: { "Content-Type": chunk.type },
		});
	}

	static async getPresignedUrl(
		key: string,
		uploadId: string,
		partNumber: number
	) {
		return await axios.post<{ key: string; url: string }>(
			`http://localhost:5014/files/${key}/presigned-part`,
			{
				uploadId,
				partNumber,
			}
		);
	}

	static async compleateMultipart(
		key: string,
		uploadId: string,
		parts: PartETagInfo[]
	) {
		return await axios.post<{ key: string; location: string }>(
			`http://localhost:5014/files/${key}/compleated-multipart`,
			{
				uploadId,
				parts,
			}
		);
	}
}
