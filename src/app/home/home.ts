import { Component, signal, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
// import { RouterLink } from '@angular/router';
import { DocsViewer } from '../plugin.demo/docs-viewer';


@Component({
  selector: 'app-home',
  imports: [
    // RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {


  protected readonly $title = signal("Home");

  private $isBrowser = signal<boolean>(false);

  @ViewChild('viewer', { static: true }) viewer!: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    const isBrowser = isPlatformBrowser(this.platformId);
    this.$isBrowser.set(isBrowser);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    if (!this.$isBrowser()) return;

    const viewer = new DocsViewer(this.viewer.nativeElement);
    const html = `
    <h1>Hello Plugins</h1>

    <div data-plugin="callout" data-type="warning">
      This is a warning callout.
    </div>

    <div data-plugin="tabs" class="tabs">
      <button data-tab="a">Tab A</button>
      <button data-tab="b">Tab B</button>

      <div data-panel="a">Content A</div>
      <div data-panel="b" hidden>Content B</div>
    </div>
    `;

    viewer.render(html);

  }

  ngOnDestroy(): void {

  }
}

