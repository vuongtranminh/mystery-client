import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace discordpackage. */
export namespace discordpackage {

    /** GrpcMemberRole enum. */
    enum GrpcMemberRole {
        MEMBER_ROLE_UNSPECIFIED = 0,
        MEMBER_ROLE_ADMIN = 1,
        MEMBER_ROLE_MODERATOR = 2,
        MEMBER_ROLE_GUEST = 3
    }

    /** Properties of a GrpcMemberProfile. */
    interface IGrpcMemberProfile {

        /** GrpcMemberProfile memberId */
        memberId?: (string|null);

        /** GrpcMemberProfile role */
        role?: (discordpackage.GrpcMemberRole|null);

        /** GrpcMemberProfile serverId */
        serverId?: (string|null);

        /** GrpcMemberProfile joinAt */
        joinAt?: (string|null);

        /** GrpcMemberProfile profileId */
        profileId?: (string|null);

        /** GrpcMemberProfile name */
        name?: (string|null);

        /** GrpcMemberProfile avtUrl */
        avtUrl?: (string|null);
    }

    /** Represents a GrpcMemberProfile. */
    class GrpcMemberProfile implements IGrpcMemberProfile {

        /**
         * Constructs a new GrpcMemberProfile.
         * @param [properties] Properties to set
         */
        constructor(properties?: discordpackage.IGrpcMemberProfile);

        /** GrpcMemberProfile memberId. */
        public memberId?: (string|null);

        /** GrpcMemberProfile role. */
        public role?: (discordpackage.GrpcMemberRole|null);

        /** GrpcMemberProfile serverId. */
        public serverId?: (string|null);

        /** GrpcMemberProfile joinAt. */
        public joinAt?: (string|null);

        /** GrpcMemberProfile profileId. */
        public profileId: string;

        /** GrpcMemberProfile name. */
        public name: string;

        /** GrpcMemberProfile avtUrl. */
        public avtUrl?: (string|null);

        /** GrpcMemberProfile _memberId. */
        public _memberId?: "memberId";

        /** GrpcMemberProfile _role. */
        public _role?: "role";

        /** GrpcMemberProfile _serverId. */
        public _serverId?: "serverId";

        /** GrpcMemberProfile _joinAt. */
        public _joinAt?: "joinAt";

        /** GrpcMemberProfile _avtUrl. */
        public _avtUrl?: "avtUrl";

        /**
         * Creates a new GrpcMemberProfile instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GrpcMemberProfile instance
         */
        public static create(properties?: discordpackage.IGrpcMemberProfile): discordpackage.GrpcMemberProfile;

        /**
         * Encodes the specified GrpcMemberProfile message. Does not implicitly {@link discordpackage.GrpcMemberProfile.verify|verify} messages.
         * @param message GrpcMemberProfile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: discordpackage.IGrpcMemberProfile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GrpcMemberProfile message, length delimited. Does not implicitly {@link discordpackage.GrpcMemberProfile.verify|verify} messages.
         * @param message GrpcMemberProfile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: discordpackage.IGrpcMemberProfile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GrpcMemberProfile message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GrpcMemberProfile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): discordpackage.GrpcMemberProfile;

        /**
         * Decodes a GrpcMemberProfile message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GrpcMemberProfile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): discordpackage.GrpcMemberProfile;

        /**
         * Verifies a GrpcMemberProfile message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GrpcMemberProfile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GrpcMemberProfile
         */
        public static fromObject(object: { [k: string]: any }): discordpackage.GrpcMemberProfile;

        /**
         * Creates a plain object from a GrpcMemberProfile message. Also converts values to other types if specified.
         * @param message GrpcMemberProfile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: discordpackage.GrpcMemberProfile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GrpcMemberProfile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GrpcMemberProfile
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** GrpcMessageEventType enum. */
    enum GrpcMessageEventType {
        MESSAGE_EVENT_TYPE_UNSPECIFIED = 0,
        MESSAGE_EVENT_TYPE_ADD = 1,
        MESSAGE_EVENT_TYPE_EDIT = 2
    }

    /** Properties of a GrpcMessageEvent. */
    interface IGrpcMessageEvent {

        /** GrpcMessageEvent type */
        type?: (discordpackage.GrpcMessageEventType|null);

        /** GrpcMessageEvent message */
        message?: (discordpackage.IGrpcMessage|null);
    }

    /** Represents a GrpcMessageEvent. */
    class GrpcMessageEvent implements IGrpcMessageEvent {

        /**
         * Constructs a new GrpcMessageEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: discordpackage.IGrpcMessageEvent);

        /** GrpcMessageEvent type. */
        public type: discordpackage.GrpcMessageEventType;

        /** GrpcMessageEvent message. */
        public message?: (discordpackage.IGrpcMessage|null);

        /**
         * Creates a new GrpcMessageEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GrpcMessageEvent instance
         */
        public static create(properties?: discordpackage.IGrpcMessageEvent): discordpackage.GrpcMessageEvent;

        /**
         * Encodes the specified GrpcMessageEvent message. Does not implicitly {@link discordpackage.GrpcMessageEvent.verify|verify} messages.
         * @param message GrpcMessageEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: discordpackage.IGrpcMessageEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GrpcMessageEvent message, length delimited. Does not implicitly {@link discordpackage.GrpcMessageEvent.verify|verify} messages.
         * @param message GrpcMessageEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: discordpackage.IGrpcMessageEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GrpcMessageEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GrpcMessageEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): discordpackage.GrpcMessageEvent;

        /**
         * Decodes a GrpcMessageEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GrpcMessageEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): discordpackage.GrpcMessageEvent;

        /**
         * Verifies a GrpcMessageEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GrpcMessageEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GrpcMessageEvent
         */
        public static fromObject(object: { [k: string]: any }): discordpackage.GrpcMessageEvent;

        /**
         * Creates a plain object from a GrpcMessageEvent message. Also converts values to other types if specified.
         * @param message GrpcMessageEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: discordpackage.GrpcMessageEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GrpcMessageEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GrpcMessageEvent
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GrpcMessage. */
    interface IGrpcMessage {

        /** GrpcMessage messageId */
        messageId?: (string|null);

        /** GrpcMessage content */
        content?: (string|null);

        /** GrpcMessage fileUrl */
        fileUrl?: (string|null);

        /** GrpcMessage channelId */
        channelId?: (string|null);

        /** GrpcMessage createdAt */
        createdAt?: (string|null);

        /** GrpcMessage updatedAt */
        updatedAt?: (string|null);

        /** GrpcMessage deletedAt */
        deletedAt?: (string|null);

        /** GrpcMessage deletedBy */
        deletedBy?: (string|null);

        /** GrpcMessage author */
        author?: (discordpackage.IGrpcMemberProfile|null);
    }

    /** Represents a GrpcMessage. */
    class GrpcMessage implements IGrpcMessage {

        /**
         * Constructs a new GrpcMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: discordpackage.IGrpcMessage);

        /** GrpcMessage messageId. */
        public messageId: string;

        /** GrpcMessage content. */
        public content?: (string|null);

        /** GrpcMessage fileUrl. */
        public fileUrl?: (string|null);

        /** GrpcMessage channelId. */
        public channelId: string;

        /** GrpcMessage createdAt. */
        public createdAt: string;

        /** GrpcMessage updatedAt. */
        public updatedAt: string;

        /** GrpcMessage deletedAt. */
        public deletedAt?: (string|null);

        /** GrpcMessage deletedBy. */
        public deletedBy?: (string|null);

        /** GrpcMessage author. */
        public author?: (discordpackage.IGrpcMemberProfile|null);

        /** GrpcMessage _content. */
        public _content?: "content";

        /** GrpcMessage _fileUrl. */
        public _fileUrl?: "fileUrl";

        /** GrpcMessage _deletedAt. */
        public _deletedAt?: "deletedAt";

        /** GrpcMessage _deletedBy. */
        public _deletedBy?: "deletedBy";

        /**
         * Creates a new GrpcMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GrpcMessage instance
         */
        public static create(properties?: discordpackage.IGrpcMessage): discordpackage.GrpcMessage;

        /**
         * Encodes the specified GrpcMessage message. Does not implicitly {@link discordpackage.GrpcMessage.verify|verify} messages.
         * @param message GrpcMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: discordpackage.IGrpcMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GrpcMessage message, length delimited. Does not implicitly {@link discordpackage.GrpcMessage.verify|verify} messages.
         * @param message GrpcMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: discordpackage.IGrpcMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GrpcMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GrpcMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): discordpackage.GrpcMessage;

        /**
         * Decodes a GrpcMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GrpcMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): discordpackage.GrpcMessage;

        /**
         * Verifies a GrpcMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GrpcMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GrpcMessage
         */
        public static fromObject(object: { [k: string]: any }): discordpackage.GrpcMessage;

        /**
         * Creates a plain object from a GrpcMessage message. Also converts values to other types if specified.
         * @param message GrpcMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: discordpackage.GrpcMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GrpcMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GrpcMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
