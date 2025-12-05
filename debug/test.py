from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

items_db = {}

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/")
async def create_item(item: Item):
    if item.price < 0:
        raise HTTPException("Price cannot be negative")
    
    item_id = len(items_db) + 1
    items_db[item_id] = item
    return {"id": item_id, "name": item.name, "price": item.price}

def get_item_by_id(item_id: int):
    if item_id in items_db:
        item = items_db[item_id]
        return {"id": item_id, "name": item.name, "price": item.price}
    else:
        raise HTTPException(status_code=404, detail="Item not found")

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    item = get_item_by_id(item_id)
    return item
    
# explanation of changes made:
# - added items_db to store items so we can retrieve them later throghugh get_item_by_id function
# - generated id incrementally when creating new item
# - created get_item_by_id function to fetch item details by id
# - replace value error with HTTPException for better error handling