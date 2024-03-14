CREATE TABLE `emails` (
	`id` text PRIMARY KEY NOT NULL,
	`message_from` text NOT NULL,
	`message_to` text NOT NULL,
	`headers` text NOT NULL,
	`from` text NOT NULL,
	`sender` text,
	`reply_to` text,
	`delivered_to` text,
	`return_path` text,
	`to` text,

	`subject` text,
	`message_id` text NOT NULL,
	`in_reply_to` text,
	`references` text,
	`date` text,
	`html` text,
	`text` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);