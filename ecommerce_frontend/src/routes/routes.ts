export const collectionFilter = [
  {
    laptop: {
      brands: {
        title: "Thương hiệu",
        children: [
          {
            name: "Tất cả",
            value: "default",
          },
          {
            name: "MSI",
            value: "laptop-msi"
          },
          {
            name: "ASUS",
            value: "laptop-asus"
          },
          {
            name: "Lenovo",
            value: "laptop-lenovo"
          }
        ]
      },
      price_ranges: {
        title: "Lọc giá",
        children: [
          {
            name: "Tất cả",
            value: "default"
          },
          {
            name: "Dưới 10,000,000₫",
            value: "0-10000000"
          },
          {
            name: " 10,000,000₫ - 20,000,000₫",
            value: "10000000-20000000"
          },
          {
            name: " 20,000,000₫ - 30,000,000₫",
            value: "20000000-30000000"
          },
          {
            name: "Trên 30,000,000₫",
            value: "30000000-999999999999"
          }
        ]
      },
      breadcrumbs: [
        {
          title: "Laptop",
          href: ""
        },
      ]
    }
  },
  {
    laptop_msi: {
      brands: {
        title: "Thương hiệu",
        children: [
          {
            name: "Tất cả",
            value: "default",
          },
          {
            name: "MSI",
            value: "laptop-msi"
          },
          {
            name: "Khác",
            value: "laptop-msi-a"
          },

        ]
      },
      price_ranges: {
        title: "Lọc giá",
        children: [
          {
            name: "Tất cả",
            value: "default"
          },
          {
            name: "Dưới 10000000",
            value: "0-10000000"
          },
          {
            name: " 10,000,000₫ - 20,000,000₫",
            value: "10000000-20000000"
          },
          {
            name: " 20,000,000₫ - 30,000,000₫",
            value: "20000000-30000000"
          },
          {
            name: "Trên 30,000,000₫",
            value: "30000000-999999999999"
          }
        ]
      },
      breadcrumbs: [
        {
          title: "Laptop",
          href: "/collections/laptop"
        },
        {
          title: "Thương hiệu",
          href: "/"
        },
        {
          title: "MSI",
          href: "/collections/laptop-msi"
        },
        {
          title: "MSI Gaming",
          href: ""
        },
      ]
    }
  },
  {
    laptop_asus: {
      brands: {
        title: "Thương hiệu",
        children: [
          {
            name: "Tất cả",
            value: "default",
          },
          {
            name: "Asus",
            value: "laptop-asus"
          },
          {
            name: "Khác",
            value: "laptop-msi-a"
          },

        ]
      },
      price_ranges: {
        title: "Lọc giá",
        children: [
          {
            name: "Tất cả",
            value: "default"
          },
          {
            name: "Dưới 10000000",
            value: "0-10000000"
          },
          {
            name: " 10,000,000₫ - 20,000,000₫",
            value: "10000000-20000000"
          },
          {
            name: " 20,000,000₫ - 30,000,000₫",
            value: "20000000-30000000"
          },
          {
            name: "Trên 30,000,000₫",
            value: "30000000-999999999999"
          }
        ]
      },
      breadcrumbs: [
        {
          title: "Laptop",
          href: "/collections/laptop"
        },
        {
          title: "Thương hiệu",
          href: "/"
        },
        {
          title: "ASUS | ROG Gaming",
          href: "/collections/laptop-asus"
        },
        {
          title: "MSI Gaming",
          href: ""
        },
      ]
    }
  }
]