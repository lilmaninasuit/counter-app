import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SavedCounter } from '../models/saved-counter';
import { CounterService } from '../services/counter.service';
import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let counterServiceMock: { add: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    counterServiceMock = {
      add: vi.fn().mockResolvedValue(undefined),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: CounterService, useValue: counterServiceMock },
      ],
    });

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call CounterService.add when onSaved is triggered', async () => {
    const counter: SavedCounter = {
      id: '1',
      name: 'Test',
      value: 5,
      createdAt: '2026-10-18T00:00:00.000Z',
    };

    await component.onSaved(counter);

    expect(counterServiceMock.add).toHaveBeenCalledWith(counter);
  });
});