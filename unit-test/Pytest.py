import pytest

def perimeter(length, width):
   if length is None or width is None:
       raise ValueError("undefined")
   
   if not isinstance(length, (int, float)):
       raise TypeError("Not a number")
   
   if not isinstance(width, (int, float)):
       raise TypeError("Not a number")
   
   if length < 0 or width < 0:
       raise ValueError("dimension cannot be negative value")
   
   return 2 * (length + width)

# test cases for perimeter function

def test_perimeter_valid():
    assert perimeter(5, 10) == 30
    assert perimeter(0, 0) == 0
    assert perimeter(2.5, 3.5) == 12.0

def test_perimeter_undefined():
    with pytest.raises(ValueError) as e:
        perimeter(None, 5)
    assert str(e.value) == "undefined"
    
    with pytest.raises(ValueError) as e:
        perimeter(5, None)
    assert str(e.value) == "undefined"

def test_perimeter_not_a_number():
    with pytest.raises(TypeError) as e:
        perimeter("5", 10)
    assert str(e.value) == "Not a number"
    
    with pytest.raises(TypeError) as e:
        perimeter(5, "10")
    assert str(e.value) == "Not a number"

def test_perimeter_negative_dimension():
    with pytest.raises(ValueError) as e:
        perimeter(-5, 10)
    assert str(e.value) == "dimension cannot be negative value"
    
    with pytest.raises(ValueError) as e:
        perimeter(5, -10)
    assert str(e.value) == "dimension cannot be negative value"
