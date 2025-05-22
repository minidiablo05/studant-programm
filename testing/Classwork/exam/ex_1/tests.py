import unittest
from servis import shop


class TestShopService(unittest.TestCase):

    @unittest.skip("Пропускаем этот тест")
    def test_product(self):
        self.assertEqual(shop('2:4 2:5', 1), shop('1:4 5:3', 0))

    def test_dostavka(self):
        self.assertEqual(shop('2:4 2:5', 0), shop('2:4 2:5'))

    def test_nan_vvod(self):
        self.assertRaises(IndexError, shop, '')

    def test_nepolni_vvod(self):
        self.assertRaises(IndexError, shop, '2', 0)

unittest.main()
