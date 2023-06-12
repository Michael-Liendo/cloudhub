import * as Minio from "minio";

export const minioClient = new Minio.Client({
	accessKey: process.env.MINIO_ACCESS_KEY,
	secretKey: process.env.MINIO_SECRET_KEY,
	endPoint: "127.0.0.1",
	port: 9000,
	useSSL: false,
});
