import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { from, Observable } from "rxjs";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { Product } from "./models/product.model";
import { ProductService } from "./service/product.service";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [ProductService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it("should create the app", () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should products returns", () => {
    const service = TestBed.get(ProductService);
    const data = [
      {
        productName: null,
        productId: "c418e01c-d540-41fe-9ac6-003e8a1ee971",
        availableQuantity: 0
      },
      {
        productName: "Chip",
        productId: "85610816-587b-4ff5-ad9a-0091b0ca63f3",
        availableQuantity: 0
      }
    ];
    spyOn(service, "getProducts").and.callFake(() => {
      return from([data]);
    });
    fixture.detectChanges();
    expect(component.products.length).toBe(2);
  });

  it("should throw warning when quantity 0", () => {
    const service = TestBed.get(ProductService);
    component.product = new Product();
    component.product.productId = component.guidGenerator();
    component.product.quantity = 0;
    component.addProduct();
    expect(component.warning).toBe('atleast add 1 available quantity');
  });
});
