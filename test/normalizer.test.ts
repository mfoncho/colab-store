import { io } from "@colab/client";
import { UserChannelSchema } from "../src/schemas";
import faker from "faker";
import times from "lodash/times";

const channel = ({
    id: "1",
    name: faker.name.jobType(),
    users: times(3, (index) => ({
        id: String(index),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
    })),
} as any) as io.UserChannel;

test("belongs to many", () => {
    const [normalized, related] = UserChannelSchema.normalizeOne(channel);
    expect(normalized.id).toBe("1");
    expect(normalized.users?.length).toBe(3);
    if (related.users) {
        expect(Object.values(related.users).length).toBe(3);
    } else {
        fail("expected normalized channel users");
    }
});
