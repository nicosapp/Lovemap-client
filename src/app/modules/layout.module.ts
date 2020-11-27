import { ToolbarContainerComponent } from '@app/components/global/toolbar-container.component';
import { ContainerComponent } from '@app/components/global/container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const declarations = [ToolbarContainerComponent, ContainerComponent];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations]
})
export class LayoutModule {}
