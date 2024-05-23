export interface Image {
  id: number;
  title: string;
  src: string;
}
// Giả định rằng `IMAGES` là một Promise trả về một mảng các đối tượng `Image`
const IMAGES_ASYNC: Promise<Image[]> = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        id: 0,
        title: "Enjoying a cup of coffee",
        src: "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2Mzg4Ng&ixlib=rb-1.2.1&q=80&w=400",
      },
      {
        id: 1,
        title: "Magical winter sunrise",
        src: "https://images.unsplash.com/photo-1618824834718-92f8469a4dd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDAzMw&ixlib=rb-1.2.1&q=80&w=400",
      },
      {
        id: 2,
        title: "Dalmatian and pumpkins",
        src: "https://images.unsplash.com/photo-1633289944756-6295be214e16?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDA3Nw&ixlib=rb-1.2.1&q=80&w=400",
      },
      {
        id: 3,
        title: "Fall into Autumn 🍂🐶",
        src: "https://images.unsplash.com/photo-1633172905740-2eb6730c95b4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDEwMg&ixlib=rb-1.2.1&q=80&w=400",
      },
      // Thêm các phần tử khác nếu cần
    ]);
  }, 5000); // Độ trễ 2 giây
});

let IMAGES: Image[] = [
  {
    id: 0,
    title: "Enjoying a cup of coffee",
    src: "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2Mzg4Ng&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 1,
    title: "Magical winter sunrise",
    src: "https://images.unsplash.com/photo-1618824834718-92f8469a4dd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDAzMw&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 2,
    title: "Dalmatian and pumpkins",
    src: "https://images.unsplash.com/photo-1633289944756-6295be214e16?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDA3Nw&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 3,
    title: "Fall into Autumn 🍂🐶",
    src: "https://images.unsplash.com/photo-1633172905740-2eb6730c95b4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDEwMg&ixlib=rb-1.2.1&q=80&w=400",
  },
];

function getImageById(id: number) {
  return IMAGES.find((image) => image.id === id);
}

async function async_getAllImages(): Promise<Image[]> {
  const array = await IMAGES_ASYNC;
  return array;
}

function async_findImageById(id: number): Promise<Image> {
  return new Promise((resolve, reject) => {
    const image = IMAGES.find((img) => img.id == id);
    if (image) {
      resolve(image);
    } else {
      reject(new Error(`Image with id ${id} not found`));
    }
  });
}

export { IMAGES, getImageById, async_findImageById, async_getAllImages };
