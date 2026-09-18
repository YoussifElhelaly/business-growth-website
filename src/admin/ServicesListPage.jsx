import { useState } from "react";
import { Button, Icon, IconButton } from "../design-system/index.js";
import { useAdminServices, useDeleteService, useReorderServices } from "../api/adminHooks.js";
import { ServiceFormDialog } from "./ServiceFormDialog.jsx";
import { ConfirmDialog } from "./ConfirmDialog.jsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export function ServicesListPage() {
  const { data: services, isLoading } = useAdminServices();
  const reorder = useReorderServices();
  const deleteMutation = useDeleteService();
  const [formState, setFormState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination || !services) return;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (sourceIndex === destIndex) return;

    const next = Array.from(services);
    const [removed] = next.splice(sourceIndex, 1);
    next.splice(destIndex, 0, removed);
    
    reorder.mutate(next.map((s) => s.id));
  };

  const confirmDelete = () => {
    deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-text-strong">الخدمات</h1>
        <Button size="sm" iconStart="plus" onClick={() => setFormState({ service: null })}>
          إضافة خدمة
        </Button>
      </div>

      {isLoading ? (
        <p className="mt-8 text-text-muted">جارِ التحميل…</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="services-list">
            {(provided) => (
              <div 
                className="mt-6 flex flex-col bg-white" 
                {...provided.droppableProps} 
                ref={provided.innerRef}
              >
                {services.map((service, i) => (
                  <Draggable key={service.id} draggableId={service.id} index={i}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center gap-4 border-b border-border-subtle px-5 py-4 last:border-0 ${snapshot.isDragging ? 'bg-sand shadow-lg z-50' : 'bg-white'}`}
                      >
                        <div 
                          {...provided.dragHandleProps} 
                          className="cursor-grab hover:text-copper active:cursor-grabbing text-text-muted p-2 -ms-2"
                        >
                          <Icon name="grip-vertical" size={20} />
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-green">
                          <Icon name={service.icon || "building"} size={18} />
                        </span>
                        
                        <div className="flex-1">
                          <p className="font-semibold text-text-strong">{service.title?.ar}</p>
                          <p className="text-sm text-text-muted">{service.tag?.ar}</p>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <IconButton name="edit" label="تعديل" onClick={() => setFormState({ service })} />
                          <IconButton name="trash" label="حذف" onClick={() => setDeleteTarget(service)} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {services.length === 0 && <p className="px-5 py-8 text-center text-text-muted">لا توجد خدمات بعد</p>}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <ServiceFormDialog
        open={Boolean(formState)}
        service={formState?.service ?? null}
        onClose={() => setFormState(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="حذف خدمة"
        body={deleteTarget ? `هل أنت متأكد من حذف خدمة "${deleteTarget.title?.ar}"؟ لا يمكن التراجع.` : ""}
        confirmLabel="حذف"
        pending={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
