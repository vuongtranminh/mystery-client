/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  discordpackage: {
    nested: {
      GrpcMemberRole: {
        values: {
          MEMBER_ROLE_UNSPECIFIED: 0,
          MEMBER_ROLE_ADMIN: 1,
          MEMBER_ROLE_MODERATOR: 2,
          MEMBER_ROLE_GUEST: 3
        }
      },
      GrpcMemberProfile: {
        oneofs: {
          _memberId: {
            oneof: [
              "memberId"
            ]
          },
          _role: {
            oneof: [
              "role"
            ]
          },
          _serverId: {
            oneof: [
              "serverId"
            ]
          },
          _joinAt: {
            oneof: [
              "joinAt"
            ]
          },
          _avtUrl: {
            oneof: [
              "avtUrl"
            ]
          }
        },
        fields: {
          memberId: {
            type: "string",
            id: 1,
            options: {
              proto3_optional: true
            }
          },
          role: {
            type: "GrpcMemberRole",
            id: 2,
            options: {
              proto3_optional: true
            }
          },
          serverId: {
            type: "string",
            id: 3,
            options: {
              proto3_optional: true
            }
          },
          joinAt: {
            type: "string",
            id: 4,
            options: {
              proto3_optional: true
            }
          },
          profileId: {
            type: "string",
            id: 5
          },
          name: {
            type: "string",
            id: 6
          },
          avtUrl: {
            type: "string",
            id: 7,
            options: {
              proto3_optional: true
            }
          }
        }
      },
      GrpcMessageEventType: {
        values: {
          MESSAGE_EVENT_TYPE_UNSPECIFIED: 0,
          MESSAGE_EVENT_TYPE_ADD: 1,
          MESSAGE_EVENT_TYPE_EDIT: 2
        }
      },
      GrpcMessageEvent: {
        fields: {
          type: {
            type: "GrpcMessageEventType",
            id: 1
          },
          message: {
            type: "GrpcMessage",
            id: 2
          }
        }
      },
      GrpcMessage: {
        oneofs: {
          _content: {
            oneof: [
              "content"
            ]
          },
          _fileUrl: {
            oneof: [
              "fileUrl"
            ]
          },
          _deletedAt: {
            oneof: [
              "deletedAt"
            ]
          },
          _deletedBy: {
            oneof: [
              "deletedBy"
            ]
          }
        },
        fields: {
          messageId: {
            type: "string",
            id: 1
          },
          content: {
            type: "string",
            id: 2,
            options: {
              proto3_optional: true
            }
          },
          fileUrl: {
            type: "string",
            id: 3,
            options: {
              proto3_optional: true
            }
          },
          channelId: {
            type: "string",
            id: 4
          },
          createdAt: {
            type: "string",
            id: 5
          },
          updatedAt: {
            type: "string",
            id: 6
          },
          deletedAt: {
            type: "string",
            id: 7,
            options: {
              proto3_optional: true
            }
          },
          deletedBy: {
            type: "string",
            id: 8,
            options: {
              proto3_optional: true
            }
          },
          author: {
            type: "GrpcMemberProfile",
            id: 9
          }
        }
      }
    }
  }
});

module.exports = $root;
