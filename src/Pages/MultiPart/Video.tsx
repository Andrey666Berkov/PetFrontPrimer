import axios from "axios";
import { useRef, useState } from "react";

interface Props {
	apiUrl: string; // URL вашего backend endpoint
}

const Video = () => {
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	const [uploadUrl, setUploadUrl] = useState("");
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [inputUrl, setInputUrl] = useState<string>("");
	const videoRef = useRef<HTMLVideoElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploading, setUploading] = useState(false);

	const handleGetUploadUrl = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5263/api/Pet/gettestMinio2"
			);
			setUploadUrl(response.data);
			return response.data;
		} catch (error) {
			console.error("Error getting upload URL:", error);
		}
	};

	const handleSetVideoUrl = () => {
		setVideoUrl(inputUrl);
	};

	const handleFileSelect = () => {
		fileInputRef.current?.click();
	};

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files && event.target.files[0];
		if (!file) {
			return;
		}
		setUploading(true);
		let ttt = "";
		if (!uploadUrl) {
			ttt = await handleGetUploadUrl();
		}

		try {
			console.log(ttt);
			await axios.put(ttt as string, file, {
				headers: {
					"Content-Type": "video/mp4",
				},
				onUploadProgress: (progressEvent) => {
					const progress = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					setUploadProgress(progress);
				},
			});
			console.log("Video uploaded successfully!");
			setUploadProgress(100);
			setUploading(false);

			// Устанавливаем URL видео после загрузки
			console.log(uploadUrl);
			const key = (uploadUrl as string).split("/").pop(); // получаем имя ключа файла
			if (key) {
				const videoUrl = `https://bucket.s3.amazonaws.com/${key}`;
				setVideoUrl(videoUrl);
			}
		} catch (error) {
			console.error("Error uploading video:", error);
			setUploading(false);
		}

		fileInputRef.current!.value = "";
	};

	return (
		<div className="flex flex-col items-center p-4">
			{/* Input for Video URL */}
			<div className="mb-4 w-full max-w-md">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="videoUrl"
				>
					Ссылка на видео
				</label>
				<input
					type="text"
					id="videoUrl"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="Вставьте ссылку на видео"
					value={inputUrl}
					onChange={(e) => setInputUrl(e.target.value)}
				/>
				<button
					className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					onClick={handleSetVideoUrl}
				>
					Загрузить видео
				</button>
			</div>

			{/* Video Player */}
			{videoUrl && (
				<div className="mb-4">
					<video ref={videoRef} controls className="w-full max-w-2xl h-auto">
						<source src={videoUrl} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			)}
			{!videoUrl && (
				<p className="text-gray-600 text-center mb-4">Видео не выбрано</p>
			)}

			{/* Video Upload Section */}
			<div className="mb-4 w-full max-w-md flex flex-col items-center">
				<button
					onClick={handleFileSelect}
					disabled={uploading}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Выбрать файл
				</button>
				<input
					type="file"
					style={{ display: "none" }}
					ref={fileInputRef}
					accept="video/*"
					onChange={handleFileUpload}
				/>
				{uploading && (
					<div className="text-gray-700 mt-2">Загрузка: {uploadProgress}%</div>
				)}
			</div>
		</div>
	);
};

export default Video;
